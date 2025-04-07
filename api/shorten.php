<?php
require "database/Database.php";
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
    $url = $_POST["url"];
    $shortcode = generateShortcode();

    // check for existing record
    if (recordExists($db, "url", $url)) {
        return ["shortcode" => null];
    } else {
        // create record in database
        $db->query(
            "insert into url_information (url, shortcode) values (:url, :shortcode)",
            [
                ":url" => $url,
                ":shortcode" => $shortcode,
            ]
        );

        // fetch id and timestamps from its database entry
        $db_response = $db
            ->query(
                "select id, createdAt, updatedAt from url_information where shortcode = :shortcode",
                [":shortcode" => $shortcode]
            )
            ->fetch();

        return [
            "id" => $db_response["id"],
            "url" => $url,
            "shortcode" => $shortcode,
            "createdAt" => $db_response["createdAt"],
            "updatedAt" => $db_response["updatedAt"],
        ];
    }
}

function GET_urlData($db, $shortcode)
{
    // query for record in database
    if (recordExists($db, "shortcode", $shortcode)) {
        $db_response = $db
            ->query(
                "select id, url, createdAt, updatedAt from url_information where shortcode = :shortcode",
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
        return [
            "id" => $db_response["id"],
            "url" => $db_response["url"],
            "shortcode" => $shortcode,
            "createdAt" => $db_response["createdAt"],
            "updatedAt" => $db_response["updatedAt"],
        ];
    } else {
        return null;
    }
}

// ** Configure actions

$method = $_SERVER["REQUEST_METHOD"];
switch ($method) {
    case "GET":
        $data = GET_urlData($db, $shortcode); // shortcode is passed in from index.php
        if ($data != null) {
            http_response_code(200);
            echo json_encode($data);
        } else {
            http_response_code(404);
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode("No URL found for this shortcode.");
        }
        break;
    case "POST":
        $data = POST_shortcode($db);
        if ($data["shortcode"] != null) {
            http_response_code(201);
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode($data);
        } else {
            http_response_code(400);
            header("Content-Type: application/json; charset=utf-8");
            echo json_encode("A shortcode for this URL already exists.");
        }
        break;
}
