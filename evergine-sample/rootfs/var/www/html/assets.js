var assets = [{url:'Content/02181b63-5a0e-46d1-9208-d92376ae33fb.wepmt',path:'Content/',name:'02181b63-5a0e-46d1-9208-d92376ae33fb.wepmt',size:1722},{url:'Content/0db59561-b3f5-444f-b5de-e62e3a5b42bf.weprl',path:'Content/',name:'0db59561-b3f5-444f-b5de-e62e3a5b42bf.weprl',size:409},{url:'Content/36296e81-1d69-4d6d-bcd4-7920088b1524.weprp',path:'Content/',name:'36296e81-1d69-4d6d-bcd4-7920088b1524.weprp',size:549581},{url:'Content/5d0ed39b-6526-4c39-8de0-d00d78ba5de0.wepfx',path:'Content/',name:'5d0ed39b-6526-4c39-8de0-d00d78ba5de0.wepfx',size:33690},{url:'Content/5f795365-07f5-4b56-83df-043eb40a7457.wepmt',path:'Content/',name:'5f795365-07f5-4b56-83df-043eb40a7457.wepmt',size:617},{url:'Content/7d1e2792-2031-42bb-a67c-0dbd282be12a.wepsp',path:'Content/',name:'7d1e2792-2031-42bb-a67c-0dbd282be12a.wepsp',size:134},{url:'Content/8b1d459c-c433-4ee3-bfe5-b45fbce12736.weptx',path:'Content/',name:'8b1d459c-c433-4ee3-bfe5-b45fbce12736.weptx',size:5592684},{url:'Content/8e7317aa-3a55-45c6-82a5-47d333abe272.weprl',path:'Content/',name:'8e7317aa-3a55-45c6-82a5-47d333abe272.weprl',size:409},{url:'Content/9018edf8-ea96-4721-bf83-5561942432e0.wepsp',path:'Content/',name:'9018edf8-ea96-4721-bf83-5561942432e0.wepsp',size:134},{url:'Content/cache.yaml',path:'Content/',name:'cache.yaml',size:3106},{url:'Content/d551eb2b-202d-454d-a059-c3ddce284636.wepfx',path:'Content/',name:'d551eb2b-202d-454d-a059-c3ddce284636.wepfx',size:21587},{url:'Content/d672019c-2887-4056-a0e7-2141d2fe5f78.wepfx',path:'Content/',name:'d672019c-2887-4056-a0e7-2141d2fe5f78.wepfx',size:5296},{url:'Content/d68b16ac-1b98-4b1a-95f6-eb39a41b70ec.wepfx',path:'Content/',name:'d68b16ac-1b98-4b1a-95f6-eb39a41b70ec.wepfx',size:27758},{url:'Content/d81d459c-c433-4ee3-bfe5-b45fbce12736.weptx',path:'Content/',name:'d81d459c-c433-4ee3-bfe5-b45fbce12736.weptx',size:65776},{url:'Content/da9e0221-f777-4e5a-96c2-df012f2d7bf2.weprl',path:'Content/',name:'da9e0221-f777-4e5a-96c2-df012f2d7bf2.weprl',size:409},{url:'Content/daa1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',path:'Content/',name:'daa1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',size:135639},{url:'Content/dbb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',path:'Content/',name:'dbb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',size:7312},{url:'Content/dcb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',path:'Content/',name:'dcb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',size:3102},{url:'Content/dd86a555-371c-4c72-8cf3-c32d5219af74.wepfx',path:'Content/',name:'dd86a555-371c-4c72-8cf3-c32d5219af74.wepfx',size:5990},{url:'Content/ddb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',path:'Content/',name:'ddb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',size:16087},{url:'Content/deb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',path:'Content/',name:'deb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx',size:17066},{url:'Content/dfb5efbf-33e9-4b56-836d-cb8ca4ca0c80.wepfx',path:'Content/',name:'dfb5efbf-33e9-4b56-836d-cb8ca4ca0c80.wepfx',size:2909},{url:'Content/e35c59a9-26ab-4b4c-8210-4b1f21c31530.weprl',path:'Content/',name:'e35c59a9-26ab-4b4c-8210-4b1f21c31530.weprl',size:409}];
// This variable will be written by PreloadContent target
// var assets = [{ url: "assets/file.txt", path: "assets", name: "file.txt" }];

var timeout_ms = 5 * 1000;

var assetsLength = assets.length;
var progressSum = 0;
var assetsProgress = new Object();
var assetsLoaded = 0;

// This is the promise code, so this is the useful bit
function ensureFilesystemIsSet(timeout) {
  var start = Date.now();
  return new Promise(waitForFS); // set the promise object within the ensureFilesystemIsSet object

  // waitForFS makes the decision whether the condition is met
  // or not met or the timeout has been exceeded which means
  // this promise will be rejected
  function waitForFS(resolve, reject) {
    if (window.FS) resolve(window.FS);
    else if (timeout && Date.now() - start >= timeout)
      reject(new Error("timeout"));
    else setTimeout(waitForFS.bind(this, resolve, reject), 30);
  }
}

function loadAsset(asset) {
  assetsProgress[asset.url] = 0;

  let xhr = new XMLHttpRequest();
  xhr.open("GET", asset.url, true);
  xhr.responseType = "blob";
  xhr.onprogress = function (event) {
    let contentLength;
    if (event.lengthComputable) {
      contentLength = event.total;
    } else {
      contentLength = asset.size; // original size
    }
    progressSum -= assetsProgress[asset.url];
    assetsProgress[asset.url] = event.loaded / contentLength;
    progressSum += assetsProgress[asset.url];
    if (Module["setProgress"])
      Module["setProgress"]((progressSum / assetsLength) * 100);
  };
  xhr.onerror = function (event) {
    throw new Error("NetworkError for: " + packageName);
  };
  xhr.onload = function (event) {
    if (
      xhr.status == 200 ||
      xhr.status == 304 ||
      xhr.status == 206 ||
      (xhr.status == 0 && xhr.response)
    ) {
      // file URLs can return 0
      var packageData = xhr.response;
      packageData
        .arrayBuffer()
        .then((data) => saveFile(asset.path, asset.name, data));
    } else {
      throw new Error(xhr.statusText + " : " + xhr.responseURL);
    }
  };
  xhr.send(null);
}

function saveFile(parentDirectory, fileName, data) {
  let bytes = new Uint8Array(data);

  FS.createPath("/", parentDirectory, true, true);

  if (!MONO.mono_wasm_load_data_archive(bytes, parentDirectory)) {
    let fileRet = FS.createDataFile(
      parentDirectory,
      fileName,
      bytes,
      true,
      true,
      true
    );
  }
  assetsLoaded += 1;
  if (areAllAssetsLoaded()) {
    console.log(`...FS completed.`);
  }
}

function areAllAssetsLoaded() {
  return assetsLength == assetsLoaded;
}

// Hack for random dotnet failure when creating files
window.HEAP8 = {
  buffer: 0,
};

// This runs the promise code
ensureFilesystemIsSet(timeout_ms)
  .then(() => {
    console.log(`Loading ${assets.length} files to FS...`);
    assets.forEach((asset) => loadAsset(asset));
  })
  .catch((e) => {
    console.log(e);
  });
