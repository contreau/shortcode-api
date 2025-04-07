<?php

$uri = parse_url($_SERVER["REQUEST_URI"])["path"];

// break down uri components
$uri_components = explode("/", trim($uri, "/"));

// get the amount of paths (/foo/bar = pathSize of 2)
$pathSize = count($uri_components);

// grab the value of the last path
$last_path = $uri_components[$pathSize - 1];

switch ($pathSize) {
    case 1:
        // route to api to handle either POST for /shorten (via js) or GET for /{shortcode} (via address bar in browser)
        if ($last_path == "shorten") {
            require "api/shorten.php";
        }
        break;
    case 2:
        // route to api to handle GET, PUT, and DELETE for /shorten/code
        $action = "";
        $shortcode = $last_path;
        require "api/shorten.php";
        break;
    case 3:
        // route to api to handle GET for /shorten/code/stats
        $action = "stats";
        require "api/shorten.php";
        break;
}
