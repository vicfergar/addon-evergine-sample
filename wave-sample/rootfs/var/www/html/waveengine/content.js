
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
 loadPackage({"files":[{"filename":"/Content/02181b63-5a0e-46d1-9208-d92376ae33fb.wepmt","start":0,"end":2101,"audio":0},{"filename":"/Content/0db59561-b3f5-444f-b5de-e62e3a5b42bf.weprl","start":2101,"end":2508,"audio":0},{"filename":"/Content/1104127f-8a0e-4a1c-9b8c-b8832362a809.weptx","start":2508,"end":3472,"audio":0},{"filename":"/Content/34b16253-37ce-457a-bd5b-3ed27bb51738.weptx","start":3472,"end":1401852,"audio":0},{"filename":"/Content/385d88a2-9a0c-4275-ac7d-499207f1bae0.weptx","start":1401852,"end":1445836,"audio":0},{"filename":"/Content/5f795365-07f5-4b56-83df-043eb40a7457.wepmt","start":1445836,"end":1446467,"audio":0},{"filename":"/Content/75a8073c-1878-4160-a92d-da0d7530cbb6.weptx","start":1446467,"end":12505371,"audio":0},{"filename":"/Content/7d1e2792-2031-42bb-a67c-0dbd282be12a.wepsp","start":12505371,"end":12505507,"audio":0},{"filename":"/Content/85459c5f-78da-4ed0-9038-26d2dd27280d.weptx","start":12505507,"end":18098195,"audio":0},{"filename":"/Content/8b1d459c-c433-4ee3-bfe5-b45fbce12736.weptx","start":18098195,"end":23690883,"audio":0},{"filename":"/Content/9018edf8-ea96-4721-bf83-5561942432e0.wepsp","start":23690883,"end":23691019,"audio":0},{"filename":"/Content/b865ba80-ac88-4440-b4c4-f6215ff9f3ac.wepsc","start":23691019,"end":23701537,"audio":0},{"filename":"/Content/cache.yaml","start":23701537,"end":23714219,"audio":0},{"filename":"/Content/cb4c9738-03a0-494f-a839-20a22581fb59.weprp","start":23714219,"end":24263234,"audio":0},{"filename":"/Content/d551eb2b-202d-454d-a059-c3ddce284636.wepfx","start":24263234,"end":24288843,"audio":0},{"filename":"/Content/d672019c-2887-4056-a0e7-2141d2fe5f78.wepfx","start":24288843,"end":24295271,"audio":0},{"filename":"/Content/d68b16ac-1b98-4b1a-95f6-eb39a41b70ec.wepfx","start":24295271,"end":24322075,"audio":0},{"filename":"/Content/d81d459c-c433-4ee3-bfe5-b45fbce12736.weptx","start":24322075,"end":24387855,"audio":0},{"filename":"/Content/da9e0221-f777-4e5a-96c2-df012f2d7bf2.weprl","start":24387855,"end":24388262,"audio":0},{"filename":"/Content/daa1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":24388262,"end":24556878,"audio":0},{"filename":"/Content/dbb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":24556878,"end":24564031,"audio":0},{"filename":"/Content/dcb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":24564031,"end":24568872,"audio":0},{"filename":"/Content/dd593717-0922-4f58-9c85-c309658eff03.weppp","start":24568872,"end":24607348,"audio":0},{"filename":"/Content/dd86a555-371c-4c72-8cf3-c32d5219af74.wepfx","start":24607348,"end":24612938,"audio":0},{"filename":"/Content/ddb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":24612938,"end":24646085,"audio":0},{"filename":"/Content/deb1f60a-82ad-40fc-8fbb-7b85caa6de0a.wepfx","start":24646085,"end":24662705,"audio":0},{"filename":"/Content/dfb5efbf-33e9-4b56-836d-cb8ca4ca0c80.wepfx","start":24662705,"end":24665534,"audio":0},{"filename":"/Content/e0af90ab-4784-417f-93e9-0617574a5cf8.weprl","start":24665534,"end":24665941,"audio":0},{"filename":"/Content/e35c59a9-26ab-4b4c-8210-4b1f21c31530.weprl","start":24665941,"end":24666348,"audio":0}],"remote_package_size":24666348,"package_uuid":"13090f1b-f409-4a9b-8329-5d13aa6842d3"});

})();
