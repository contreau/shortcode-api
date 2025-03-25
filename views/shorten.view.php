<?php require "layout.php"; ?>

<?php if ($method == "POST"): ?>
<p>Received the following url: <?= $long_url ?></p>
<p>Shortcode created: <strong>localhost:8000/<?= $shortcode ?></strong></p>
<?php endif; ?>
