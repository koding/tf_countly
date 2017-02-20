// adds PATH config into nginx if it exists in ENV vars

var fs = require('fs');
var path  = require('path');

var countlyPath = '/opt/countly';
var pluginsJSONSourcePath =  countlyPath + '/plugins/plugins.json';
var pluginsPath = countlyPath + '/plugins/';
var pluginsJSONTargetPath = pluginsJSONSourcePath;

var plugins = require(pluginsJSONSourcePath);

var pluginsFolderList = fs.readdirSync(pluginsPath);
var existingPlugins = [];

// read existing plugins from plugins folder
for (var i = 0; i < pluginsFolderList.length; i++) {
    var plugin = pluginsFolderList[i];

    var p = path.join(pluginsPath, plugin);
    // plugins are in folder.
    if(fs.statSync(p).isDirectory()){
        existingPlugins.push(plugin);
    }
}

// merge plugins.json with existing plugins
for (i = 0; i < existingPlugins.length; i++ ){
    var plugin = existingPlugins[i];
    if (plugin == "empty") { // have no idea what is empty
        continue;
    }
    if(plugins.indexOf(plugin) < 0) {
        plugins.push(plugin);
    }
}

fs.writeFileSync(pluginsJSONTargetPath, JSON.stringify(plugins));
