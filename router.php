<?php

$routes = [
    "/" => "views/index.html",
    "/shorten" => "api/shorten.php",
    "/400" => "views/error-codes/400.php",
    "/404" => "views/error-codes/400.php",
    "/endpoint" => "api/endpoint.php",
];

$uri = parse_url($_SERVER["REQUEST_URI"])["path"];

if ($uri == "/") {
    require "views/index.html";
} else {
    // break down uri components
    $uri_components = $uri_components = explode("/", trim($uri, "/"));

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
            // route to api to handle GET, POST, PUT, and DELETE for /shorten/code
            $endpoint = $uri_components[0];
            require "api/{$endpoint}.php";
            break;
        case 3:
            // route to api to handle GET for /shorten/code/stats
            break;
    }
}

// function routeToController($uri, $routes)
// {
//     if (array_key_exists($uri, $routes)) {
//         require $routes[$uri];
//     }
// }

// routeToController($uri, $routes);
