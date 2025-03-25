<?php

$uri = parse_url($_SERVER["REQUEST_URI"])["path"];
$routes = [
    "/" => "views/index.html",
    "/shorten" => "controllers/shorten.php",
    "/400" => "views/error-codes/400.php",
    "/404" => "views/error-codes/400.php",
];

function routeToController($uri, $routes)
{
    if (array_key_exists($uri, $routes)) {
        require $routes[$uri];
    }
}

routeToController($uri, $routes);
