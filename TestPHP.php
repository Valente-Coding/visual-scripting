<?php
    header('Content-Type: application/json');   // send JSON header, let page know it's JSON
    print(json_encode($_POST['name']));    // get the name
?>
