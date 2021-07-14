const assert = require('assert');
const path = require('path');
const Application = require('spectron').Application;
const electronPath = require('electron');

const app = new Application({
  path: electronPath,
  args: [path.join(__dirname, '..')],
});

const appTitle = 'Clipboard Electron App';

describe(appTitle, function() {
  this.timeout(10000);

  beforeEach(() => {
    return app.start();
  });

  afterEach(() => {
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  // it('shows an initial window', async () => {
  //   const count = await app.client.getWindowCount();
  //   // console.log(await app.client.windowHandles().values[0]);
  //   // app.client.windowHandles()
  //   //   .then((handles) => {
  //   //   const windowA = handles.values[0];
  //   //   const windowB = handles.values[1];
  //   //   console.log(windowA, windowB);
  //   //   console.log(handles);
  //   // // app.client.window(windowA);  <-- Will focus windowA
  //   // // app.client.window(windowB);  <-- Will focus windowB
  //   // });
  //   let handles = await app.client.windowHandles()
  //   console.log(handles);
  //   // app.client.window(handles.value[0]);
  //   await app.client.windowByIndex(0);
  //   // setTimeout(() => {
  //   //   console.log('timeout passou');
  //   // }, 10000);
  //   return assert.strictEqual(count,2);
  // });

//   it('has the correct title', async () => {
//     const title = await app.client.waitUntilWindowLoaded().getTitle();
//     return assert.strictEqual(title, appTitle);
//     // We'll do this one together.
//   });

//   it('does not have the developer tools open', async () => {
//     // We'll do this one together.
//     const devToolsAreOpen = await  app.client
//       .waitUntilWindowLoaded()
//       .browserWindow.isDevToolsOpened();
//     return assert.strictEqual(devToolsAreOpen, false);
//   });
// 1
//   it('has a button with the text "Copy from Clipboard"', async () => {
//     const buttonText = await app.client.getText('#copy-from-clipboard');
//     return assert.strictEqual(buttonText, 'Copy from Clipboard');
//   });

//   it('should not have any clippings when the application starts up', async () => {
//     await app.client. waitUntilWindowLoaded();
//     //"$" means document.querySelector
//     //"$$" means document.querySelectorAll
//     // They are native functions of Google Chrome and Firefox browsers.
//     // You can see $ and $$ definition in Safari as well.
//     // $('div');  // returns first DIV in DOM
//     // $$('div'); // returns all DIVs in DOM
//     const clippings = await app.client.$$('.clippings-list-item');
//     return assert.strictEqual(clippings.length, 0);
//   });

//   it('should have one clipping when the "Copy From Clipboard" button has been pressed', async () => {
//     await app.client.waitUntilWindowLoaded();
//     await app.client.click('#copy-from-clipboard');
//     // Gets itens which has class "clippings-list-item"
//     const clippings = await app.client.$$('.clippings-list-item');
//     return assert.strictEqual(clippings.length, 1);
//   });

//   it('should successfully remove a clipping', async () => {
//     await app.client.waitUntilWindowLoaded();
//     await app.client
//       .click('#copy-from-clipboard')
//       .moveToObject('.clippings-list-item')
//       .click('.remove-clipping');
//     const clippings = await app.client.$$('.clippings-list-item');
//     return assert.strictEqual(clippings.length, 0);
//     // We'll do this one together.
//   });

//   it('should have the correct text in a new clipping', async () => {
//     /*
//      * Independent Exercise!
//      *
//      * - Write a test that adds some text to the system clipboard.
//      * - Click on the "Copy to Clipboard" button.
//      * - Get the text from the .clipping-text element.
//      * - Assert that the text in the field is the same as what you
//      *   wrote to the clipboard.
//      *
//      * Hint—You can write text to the clipboard using:
//      *   app.electron.clipboard.writeText('Vegan Ham');
//      */
//     const testText = 'It works or not?';
//     await app.client.waitUntilWindowLoaded();
//     app.electron.clipboard.writeText(testText);
//     await app.client.click('#copy-from-clipboard');
//     const clipboardText = await app.client.getText('.clipping-text');
//     return assert.strictEqual(clipboardText, testText);
//   });

  it('it should write the text of the clipping to the clipboard', async () => {
    /*
     * Independent Exercise!
     *
     * In this test, we want to make sure that Clipmaster replaces whatever is
     * already on a the clipboard. We'll implement the following steps.
     *
     * - Write a string of text to the clipboard.
     * - Click "Copy from Clipboard"
     * - Write something else to the clipboard.
     * - Click the .copy-clippling element that was created when you added
     *   the first string to Clipmaster
     * - Assert that the clipboard currently contains that first string using
     *   `app.electron.clipboard.readText()`.
     *
     */
    const testText = 'Writimg something to the clipboard';
    // await app.client.windowByIndex(0);
    let handles = await app.client.windowHandles()
    console.log(handles);
    // await app.client.windowByIndex(handles.value[0]);
    // await app.client.window(handles.value[0]);
    
    let num = await app.client.getWindowCount();
    for (let n= 0; n < num ; n++ ) {
      await app.client.windowByIndex(n);
      let min = await app.client.browserWindow.getTitle();
      console.log(n,min);
    }
    // await app.client.switchWindow(`file://D:\\projetos\\clipboard-electron-app-tests\\app/index.html`);
    await app.client.waitUntilWindowLoaded(10000)
    
    app.client.getWindowCount().then(count => {
      console.log(count);
    })
    app.client.browserWindow.isMinimized().then(min => {
      console.log(min);
    })
    app.electron.clipboard.writeText(testText);
    await app.client.click("#copy-from-clipboard");
    const newText = 'Writimg another text to the clipboard';
    app.electron.clipboard.writeText(newText);
    await app.client.click('.copy-clipping');
    const clipboardContent = await app.electron.clipboard.readText();
    // console.log({clipboardContent});
    app.client
    return assert.strictEqual(clipboardContent, testText);

  });
});
