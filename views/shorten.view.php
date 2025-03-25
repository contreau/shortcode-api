<?php require "layout.php"; ?>


<h2>Success!</h2>

<?php if ($method == "POST"): ?>
<p>Received the following url: <?= $long_url ?></p>
<p>Shortcode created: <strong>localhost:8000/<?= $shortcode ?></strong></p>
<?php endif; ?>

<?php if ($method == "GET"): ?>
<p>Retrieved the following url: <?= $long_url ?></p>
<?php endif; ?>

<p><a href="/">Go Back</a></p>
