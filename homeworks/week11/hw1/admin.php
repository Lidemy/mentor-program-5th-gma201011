<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = NULL;
  $user = NULL; 

  if (!empty($_SESSION['username'])){
    $username = $_SESSION['username'];
    $user = getUserFromUserName($username);
  }

  if ($user === NULL || $user["permission"] !== "ADMIN") {
    header("Location: index.php");
    exit();
  }



  $stmt = $conn -> prepare(
    "SELECT id, permission, nickname, username FROM gma201011_users ORDER BY id ASC"
    );

  $result = $stmt -> execute();
  

  if (!$result) {
    die ('Error' . $conn -> error);
  }

  $result = $stmt -> get_result();

?>

<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>後台管理</title>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header class="warning">
    <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
    </header>
    <main class="board">
    <a class = "admin__btn" href = "index.php">回到留言版</a>
      <section>
      <table border class ="admin__table">
        <tr>
          <th>id</th>
          <th>permission</th>
          <th>username</th>
          <th>nickname</th>
          <th>調整身份</th>
        </tr>
        <?php
          while ($row = $result -> fetch_assoc()) {
        ?>
          <?php
            if ($row['username'] !== "ad") {
          ?>
            <tr>
            <td class = "table__id"><?php echo escape($row['id']) ?></td>
            <td><?php echo escape($row['permission']) ?></td>
            <td><?php echo escape($row['username']) ?></td>
            <td><?php echo escape($row['nickname']) ?></td>
            <td class = "table__role">
            <a href = "handle_update_permission.php?permission=ADMIN&id=<?php echo escape($row['id']); ?>">管理員</a>
            <a href = "handle_update_permission.php?permission=NORMAL&id=<?php echo escape($row['id']); ?>">使用者</a>
            <a href = "handle_update_permission.php?permission=BANNED&id=<?php echo escape($row['id']); ?>">停權</a>
            </td>
            </tr>
          <?php } ?>
        <?php } ?>
      </div>
      </table>
      </section>
    </main>
  </body>
</html>