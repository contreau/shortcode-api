<?php

$uri = parse_url($_SERVER["REQUEST_URI"])["path"];
$routes = [
    "/" => "controllers/index.php",
    "/shorten" => "controllers/shorten.php",
];

function routeToController($uri, $routes)
{
    if (array_key_exists($uri, $routes)) {
        require $routes[$uri];
    }
}

routeToController($uri, $routes);
