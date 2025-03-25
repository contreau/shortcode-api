<?php

function generateShortcode(int $length = 6)
{
    // characters are alphanumeric, excluding ambiguous characters ('l', 'I', 'O', '0', '1')
    $chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    $shortcode = "";
    $max = strlen($chars) - 1;

    for ($i = 0; $i < $length; $i++) {
        $shortcode .= $chars[random_int(0, $max)];
    }

    return $shortcode;
}

function sendErrorCode(int $code)
{
    http_response_code($code);
    require "./views/error-codes/{$code}.php";
}

function recordExists($db, string $columnName, string $var): bool
{
    $response = $db
        ->query(
            "select exists(select 1 from url_information where $columnName = :$columnName) as record_exists",
            [":$columnName" => $var]
        )
        ->fetch();
    return $response["record_exists"] == 1 ? true : false;
}
