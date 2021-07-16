<?php
  require_once('conn.php');
  header('Content-type:application/json;charset = utf-8');
  header('Access-Control-Allow-Origin:*');

  //錯誤處理
  if (
    empty($_GET['site_key'])){
 
    $json = array(
      "ok" => false,
      "message" => "Please send site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
    }

    //取得資料
    $site_key = $_GET['site_key'];
   

    $sql = "SELECT id, nickname, content, created_at FROM gma201011_discussions WHERE site_key = ? " .
    (empty($_GET['before']) ? "" : "AND id < ?") . 
    " ORDER BY id DESC LIMIT 5 ";
    $stmt = $conn -> prepare($sql);
    if (empty($_GET['before'])) {
      $stmt -> bind_param('s', $site_key);
    } else {
      $stmt -> bind_param('si', $site_key, $_GET['before']);
    }
  
    $result = $stmt -> execute(); 

    //根據回傳內容判斷成功與否
    if (!$result) {
      $json = array(
        "ok" => false,
        "message" => $conn -> error
      );
      $response = json_encode($json);
      echo $response;
      die();
    }

    $result = $stmt -> get_result();
    $discussions = array();
    while ($row = $result -> fetch_assoc()) {
      array_push($discussions, array(
        "id" => $row["id"],
        "nickname" => $row["nickname"],
        "content" => $row["content"],
        "created_at" => $row["created_at"]
      ));
    }
  
    $json = array(
      "ok" => true,
      "discussions" => $discussions
    );

      $response = json_encode($json);
      echo $response;

?>