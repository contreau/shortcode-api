<?php require "layout.php"; ?>

<section class="create-url-wrapper">
<h2>Create Short URL</h2>
<form method="post" action="/shorten" >
    <input type="text" name="long_url" placeholder="Enter URL">
    <input type="submit" value="Shorten URL">
</form>
</section>
