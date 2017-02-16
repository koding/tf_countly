// adds PATH config into nginx if it exists in ENV vars

var fs = require('fs');
var path  = require('path');

var nginxConfTargetPath = '/etc/nginx/sites-enabled/default';
var nginxConfSourcePath = '/opt/countly/config/nginx.server.conf';

var nginxConf = fs.readFileSync(nginxConfSourcePath, { encoding: 'utf8' });
var apiPath = process.env.COUNTLY_PATH || '';

if (apiPath !== '') {
    // remove the first slash
    apiPath = apiPath.substring(1)
    var searchRegexp = /location.+?\//g;
    var replaceRegexp = '$&' + apiPath +'\/';
    nginxConf = nginxConf.replace(searchRegexp, replaceRegexp);
}
fs.writeFileSync(nginxConfTargetPath, nginxConf);
