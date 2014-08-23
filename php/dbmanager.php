<?php

$link = mysqli_connect("localhost","TheGenerals","tYNy5HT6V8BCDhet","TheGenerals") or die("Error " . mysqli_error($link));




/////////////////////////////////////////////
//                                         //
//             Helper Functions            //
//                                         //
/////////////////////////////////////////////


function ExecuteQuery($query)
{
    global $link;
    
    $ret = $link->query($query);
    
    if(!$ret)
        die(mysqli_error($link) . "\nQuery: $query");
    
    return $ret;
}

function QuerySingleRow($query)
{
    global $link;
    $ret = $link->query($query);
//    return $query;
    if(!$ret)
        die(mysqli_error($link) . "\nQuery: $query");
    return mysqli_fetch_assoc($ret);
}

function SQLArrayToArray($ret)
{
    $arr = [];
    while($row = mysqli_fetch_assoc($ret))
        $arr[count($arr)] = $row;

    return $arr;
}

function SQLArrayToIndexedArray($ret)
{
    $arr = [];
    while($row = mysqli_fetch_assoc($ret))
        $arr[count($arr)] = array_values($row)[0];

    return $arr;
}



function SQLArrayToJSON($ret)
{
    $arr = [];
    while($row = mysqli_fetch_assoc($ret))
        $arr[count($arr)] = $row;

    return json_encode($arr);
}

?>