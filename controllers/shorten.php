<?php
$config = require "config.php";
$db = new Database(
    $config["database"],
    $config["credentials"]["username"],
    $config["credentials"]["password"]
);

// ** Define request handlers
function POST_shortcode($db)
{
    $long_url = $_POST["long_url"];
    $shortcode = generateShortcode();

    // check for existing record
    $existingRecord = $db
        ->query(
            "select exists(select 1 from url_information where url = :url) as record_exists",
            [":url" => $long_url]
        )
        ->fetchAll();

    if (count($existingRecord) == 1) {
        sendStatusCode(400);
        return [null, null];
    } else {
        // create record in database
        $db->query(
            "insert into url_information (url, shortcode) values (:url, :shortcode)",
            [
                ":url" => $long_url,
                ":shortcode" => $shortcode,
            ]
        );
        return [$long_url, $shortcode];
    }
}

function GET_longurl()
{
    $path = parse_url($_SERVER["REQUEST_URI"]["path"]);
}

// ** Configure actions

$method = $_SERVER["REQUEST_METHOD"];
switch ($method) {
    case "GET":
        GET_longurl();
        break;
    case "POST":
        [$long_url, $shortcode] = POST_shortcode($db);
        if ($shortcode != null) {
            require "views/shorten.view.php";
        }
        break;
}
