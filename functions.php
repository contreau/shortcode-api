<?php

function generateShortcode($length = 6)
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

function sendStatusCode(int $code)
{
    http_response_code($code);
    require "./views/{$code}.php";
}
