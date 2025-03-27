<?php
require "database/functions.php";
$config = require "database/config.php";
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
    if (recordExists($db, "url", $long_url)) {
        sendErrorCode(400);
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

function GET_longurl($db)
{
    $shortcode = $_GET["shortcode"];
    // query for record in database
    if (recordExists($db, "shortcode", $shortcode)) {
        $db_response = $db
            ->query(
                "select url as long_url from url_information where shortcode = :shortcode",
                [
                    ":shortcode" => $shortcode,
                ]
            )
            ->fetch();
        // update accessCount in database
        $db->query(
            "update url_information set accessCount = accessCount + 1 where shortcode = :shortcode",
            [":shortcode" => $shortcode]
        );
        return $db_response["long_url"];
    } else {
        sendErrorCode(404);
        return null;
    }
}

// ** Configure actions

$method = $_SERVER["REQUEST_METHOD"];
switch ($method) {
    case "GET":
        $long_url = GET_longurl($db);
        if ($long_url != null) {
            http_response_code(200);
            require "views/shorten.view.php";
        }
        break;
    case "POST":
        [$long_url, $shortcode] = POST_shortcode($db);
        if ($shortcode != null) {
            http_response_code(201);
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode([$long_url, $shortcode]);
        }
        break;
}
