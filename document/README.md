
# VENDOR MODEL

```json

set vendor: send rpc

  {
    "method":"set_vendor",
    "params":{
      "type": "ble_sigmesh",
      "unicast":"unicast node",
      "opcode":"lable-opcode | opcode",
      "message":"message( int | bool | str | dict)" 
    }
  }

status vendor:(phản hồi rpc)

{ 
  "method": "vendor_status", 
  "params": { 
    "address": "unicast node", 
    "name": "sensor name", 
    "opcode": "lable-opcode", 
    "message": "message( int | bool | str)" 
  } 
}



status khi cảm biến có tác động: (lưu vào telemetry)

{
    "data_bleSigmesh_<unicast>":
    { 
        "method": "vendor_status", 
        "params": { 
            "address": "unicast node", 
            "name": "sensor name", 
            "opcode": "lable-opcode", 
            "message": "message( int | bool | str)" 
        } 
    }
}

```


list opcode:

**cảm biến chỗ trống(vacancy_sensor)**

| opcode | label opcode            | value             | Content                                      |
| :----: | :---------------------- | :---------------- | :------------------------------------------- |
|   C0   | sensor_distance_get     |                   | đọc khoảng cách hiện tại cảm biến            |
|   C1   | sensor_distance_status  | int (cm)          | cảm biến trả về khảng cách hiện tại          |
|   C2   | sensor_range_get        |                   | sensor_range_get                             |
|   C3   | sensor_range_set        | int (cm)          | set khoảng cách phát hiện                    |
|   C5   | sensor_range_status     | int (cm)          | cảm biến trả về khảng cách đã set            |
|   C9   | slots_status            | bool (True/False) | trạng thái vị trí cảm biến có vâậ caả  không |
|   CF   | maintenance_mode_set    | bool (True/False) | đưa thiết bị vào chế độ bảo trì              |
|   D4   | maintenance_mode_status | bool (True/False) | trạng thái thiết bị chế độ bảo trì           |
|   D8   | blinking_set            | int (num blink)   | làm đèn trên thiết bị nhấp nháy              |
|   DA   | blinking_status         | bool (True/False) | trạng thái khi nhận lệnh nhấp nháy đèn       |



**rfid_reader**

| opcode | label opcode        | value                      | Content                                       |
| :----: | :------------------ | :------------------------- | :-------------------------------------------- |
|   DA   | address_rfid_get    |                            | đọc về vị trí đã set cho đầu đọc              |
|   DB   | address_rfid_set    | str (vd: A001,A02,B03,...) | cài đặt vị trí cho đầu đọc(tối đa 4 ký tự)    |
|   DD   | address_rfid_status | str (vd: A001,A02,B03,...) | đầu đọc trả về vị trí đã set                  |
|   C2   | id_rfid_status      | str                        | trả về chuỗi ID của thẻ được quét vào đầu đọc |



**motion sensor**

| opcode | label opcode                | value                                                                                                                                                     | Content                                                             |
| :----: | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
|   C4   | level_get                   |                                                                                                                                                           | lệnh đọc về giá trị level detect và level unDetect cho việc dimming |
|   C5   | level_set                   | dict {"detect":int(lightness(%),"unDetect":int(lightness(%))}                                                                                             | lệnh cài đặt giá trị level hight và level low cho việc dimming      |
|   C7   | level_status                | dict {"detect":int(lightness(%),"unDetect":int(lightness(%))}                                                                                             | trả về giá trị level hight và level low cho việc dimming            |
|   C8   | status_get                  |                                                                                                                                                           | lệnh đọc về trạng thái pir hiện tại                                 |
|   C9   | status_status               | bool (True(detect)/False(unDetect))                                                                                                                       | trả về trạng thái pir hiện tại                                      |
|   CA   | brightness_get              |                                                                                                                                                           | đọc về giá trị độ sáng cho phép hoạt động                           |
|   CB   | brightness_set              | int                                                                                                                                                       | cài đặt giá độ sáng cho phép cảm biến hoạt động                     |
|   CD   | brightness_status           | int                                                                                                                                                       | giá trị độ sáng cho phép hoạt động hiện tại                         |
|   CE   | ambient_brightness_get      |                                                                                                                                                           | lệnh đọc về độ sáng của môi trường                                  |
|   CF   | ambient_brightness_status   | int                                                                                                                                                       | độ sáng môi trường hiện tại                                         |
|   D3   | blinking_set                | int (num blink)                                                                                                                                           | làm đèn trên bị nhấp nháy                                           |
|   D5   | blinking_status             |                                                                                                                                                           | trạng thái đèn nhấp nháy                                            |
|   D6   | all_info_get                |                                                                                                                                                           | lệnh đọc về tất cả thông tin                                        |
|   D7   | all_info_status             | dict { "status": bool(true-detect,false-unDetect), "delay": int(ms), "detect": int(%), "unDetect": int(%), "ambient_brightness": int, "brightness": int } | tất cả thông tin hiện tại                                           |
|   F0   | hlk_distance_sensing_get    |                                                                                                                                                           | get thông số cài đặt độ nhạy                                        |
|   F1   | hlk_distance_sensing_set    | int (0-15)                                                                                                                                                | set độ nhạy cảm biến                                                |
|   F3   | hlk_distance_sensing_status | int (0-15)                                                                                                                                                | trả về độ nhạy cảm biến đã cài đặt                                  |
|   F4   | hlk_delay_get               |                                                                                                                                                           | lấy thời gian giũ mức tích cực đã cài đặt                           |
|   F5   | hlk_delay_set               | int                                                                                                                                                       | cài đặt thời gian giữ mứcn tích cực                                 |
|   F7   | hlk_delay_status            | int                                                                                                                                                       | trả về thời gian giữ mức tích cực đã cài đặt                        |

# SENSOR MODEL

```json

get trang thai sensor (send rpc)

{
  "method":"get_sensor",
  "params":{
    "type": "ble_sigmesh",
    "unicast":"unicast node",
    "properties":"properties"
  }
}

status sensor (phản hồi rpc)

{
  "method":"sensor_status",
  "params":{
    "address":"0006",
    "<properties>": value
  }
}

status khi cảm biến có tác động: (lưu vào telemetry): 

{
    "data_bleSigmesh_<unicast>":
    {
        "method":"sensor_status",
        "params":{
            "address":"0006",
            "<properties>": value
        }
    }
}
```

**energy_sensor**


| properties | value        | Content            |
| :--------: | :----------- | :----------------- |
|   energy   | float (A)    | dòng               |
|  voltage   | int (V)      | áp                 |
|  current   | float (KW/h) | công suất tiêu thụ |




