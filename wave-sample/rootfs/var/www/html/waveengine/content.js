
var Module = typeof Module !== 'undefined' ? Module : {};

if (!Module.expectedDataFileDownloads) {
  Module.expectedDataFileDownloads = 0;
  Module.finishedDataFileDownloads = 0;
}
Module.expectedDataFileDownloads++;
(function() {
 var loadPackage = function(metadata) {

    var PACKAGE_PATH;
    if (typeof window === 'object') {
      PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
    } else if (typeof location !== 'undefined') {
      // worker
      PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
    } else {
      throw 'using preloaded data can only be done on a web page or in a web worker';
    }
    var PACKAGE_NAME = 'bin/Release/netstandard2.0//content.dat';
    var REMOTE_PACKAGE_BASE = 'content.dat';
    if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
      Module['locateFile'] = Module['locateFilePackage'];
      err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
    }
    var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
  
    var REMOTE_PACKAGE_SIZE = metadata.remote_package_size;
    var PACKAGE_UUID = metadata.package_uuid;
  
    function fetchRemotePackage(packageName, packageSize, callback, errback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', packageName, true);
      xhr.responseType = 'arraybuffer';
      xhr.onprogress = function(event) {
        var url = packageName;
        var size = packageSize;
        if (event.total) size = event.total;
        if (event.loaded) {
          if (!xhr.addedTotal) {
            xhr.addedTotal = true;
            if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
            Module.dataFileDownloads[url] = {
              loaded: event.loaded,
              total: size
            };
          } else {
            Module.dataFileDownloads[url].loaded = event.loaded;
          }
          var total = 0;
          var loaded = 0;
          var num = 0;
          for (var download in Module.dataFileDownloads) {
          var data = Module.dataFileDownloads[download];
            total += data.total;
            loaded += data.loaded;
            num++;
          }
          total = Math.ceil(total * Module.expectedDataFileDownloads/num);
          if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          if (Module['setProgress']) Module['setProgress'](loaded, total);
        } else if (!Module.dataFileDownloads) {
          if (Module['setStatus']) Module['setStatus']('Downloading data...');
        }
      };
      xhr.onerror = function(event) {
        throw new Error('NetworkError for: ' + packageName);
      }
      xhr.onload = function(event) {
        if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
          var packageData = xhr.response;
          callback(packageData);
        } else {
          throw new Error(xhr.statusText + ' : ' + xhr.responseURL);
        }
      };
      xhr.send(null);
    };

    function handleError(error) {
      console.error('package error:', error);
    };
  
      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);
    
  function runWithFS() {

    function assert(check, msg) {
      if (!check) throw msg + new Error().stack;
    }
Module['FS_createPath']('/', 'Content', true, true);

    function DataRequest(start, end, audio) {
      this.start = start;
      this.end = end;
      this.audio = audio;
    }
    DataRequest.prototype = {
      requests: {},
      open: function(mode, name) {
        this.name = name;
        this.requests[name] = this;
        Module['addRunDependency']('fp ' + this.name);
      },
      send: function() {},
      onload: function() {
        var byteArray = this.byteArray.subarray(this.start, this.end);
        this.finish(byteArray);
      },
      finish: function(byteArray) {
        var that = this;

        Module['FS_createDataFile'](this.name, null, byteArray, true, true, true); // canOwn this data in the filesystem, it is a slide into the heap that will never change
        Module['removeRunDependency']('fp ' + that.name);

        this.requests[this.name] = null;
      }
    };

        var files = metadata.files;
        for (var i = 0; i < files.length; ++i) {
          new DataRequest(files[i].start, files[i].end, files[i].audio).open('GET', files[i].filename);
        }

    function processPackageData(arrayBuffer) {
      Module.finishedDataFileDownloads++;
      assert(arrayBuffer, 'Loading data file failed.');
      assert(arrayBuffer instanceof ArrayBuffer, 'bad input to processPackageData');
      var byteArray = new Uint8Array(arrayBuffer);
      var curr;
      
        // Reuse the bytearray from the XHR as the source for file reads.
        DataRequest.prototype.byteArray = byteArray;
  
          var files = metadata.files;
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }
              Module['removeRunDependency']('datafile_bin/Release/netstandard2.0//content.dat');

    };
    Module['addRunDependency']('datafile_bin/Release/netstandard2.0//content.dat');
  
    if (!Module.preloadResults) Module.preloadResults = {};
  
      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }
    
  }
  if (Module['calledRun']) {
    runWithFS();
  } else {
    if (!Module['preRun']) Module['preRun'] = [];
    Module['preRun'].push(runWithFS); // FS is not initialized yet, wait for it
  }

 }
 loadPackage({"files":[{"filename":"/Content/02181b63-5a0e-46d1-9208-d92376ae33fb.wepmt","start":0,"end":2541,"audio":0},{"filename":"/Content/03201077-8203-456b-bfab-7fff68cfb905.weptx","start":2541,"end":5595229,"audio":0},{"filename":"/Content/0db59561-b3f5-444f-b5de-e62e3a5b42bf.weprl","start":5595229,"end":5595636,"audio":0},{"filename":"/Content/2622ab15-cd70-4710-8c31-96308e250cec.wepsc","start":5595636,"end":5602152,"audio":0},{"filename":"/Content/7d1e2792-2031-42bb-a67c-0dbd282be12a.wepsp","start":5602152,"end":5602288,"audio":0},{"filename":"/Content/9018edf8-ea96-4721-bf83-5561942432e0.wepsp","start":5602288,"end":5602424,"audio":0},{"filename":"/Content/cache.yaml","start":5602424,"end":5606502,"audio":0},{"filename":"/Content/d81d459c-c433-4ee3-bfe5-b45fbce12736.weptx","start":5606502,"end":5672282,"audio":0},{"filename":"/Content/daa1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":5672282,"end":5762389,"audio":0},{"filename":"/Content/dbb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":5762389,"end":5765840,"audio":0},{"filename":"/Content/dcb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":5765840,"end":5770730,"audio":0},{"filename":"/Content/ddb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":5770730,"end":5788920,"audio":0},{"filename":"/Content/deb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":5788920,"end":5799339,"audio":0},{"filename":"/Content/df03a57c-8730-4db9-97c5-92e0afc77206.weptx","start":5799339,"end":6324051,"audio":0},{"filename":"/Content/dfb5efbf-33e9-4b56-836d-cb8ca4ca0c80.wepfx","start":6324051,"end":6326051,"audio":0},{"filename":"/Content/e35c59a9-26ab-4b4c-8210-4b1f21c31530.weprl","start":6326051,"end":6326458,"audio":0}],"remote_package_size":6326458,"package_uuid":"944ea7af-b10a-489d-9742-9637b08246c6"});

})();
