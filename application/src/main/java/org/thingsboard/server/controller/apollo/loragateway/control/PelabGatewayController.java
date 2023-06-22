package org.thingsboard.server.controller.apollo.loragateway.control;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.thingsboard.server.controller.apollo.loragateway.model.GetAreaCode;
import org.thingsboard.server.controller.apollo.loragateway.service.HttpRequest;

import java.util.Collections;


@RestController
@RequestMapping("/api/pelab")
public class PelabGatewayController {

    @PostMapping("/login")
    public Object pelabLogin(@RequestHeader("apiKey") String apiKey,
                             @RequestHeader("baseUrl") String baseUrl,
                             @RequestBody Object login) {
        String uri = baseUrl + "/UMC/Login";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("ApiKey", apiKey);
        HttpEntity<Object> httpEntity = new HttpEntity<>(login, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response;
    }

    @PostMapping("/control/manual")
    public Object pelabManualControl(@RequestHeader("apiKey") String apiKey,
                                     @RequestHeader("baseUrl") String baseUrl,
                                     @RequestBody Object manualControl) {
        String uri = baseUrl + "/api/lamp/control-manual";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("ApiKey", apiKey);
        HttpEntity<Object> httpEntity = new HttpEntity<>(manualControl, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response;
    }

/*    @PostMapping("/control/manual")
    public Object manualControl(@RequestHeader("apiKey") String apiKey,
                                @RequestBody ManualControl manualControl) {
        try {
            String uri = "http://203.205.33.173:9025/api/lamp/control-manual";

            HttpRequest results = HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(manualControl));

            int status = results.code();
            if (status == 200) {
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();
        } catch (Exception e) {
            e.printStackTrace();
            return new Object();
        }
    }*/

    @PostMapping("/control/auto")
    public Object pelabAutoControl(@RequestHeader("apiKey") String apiKey,
                                   @RequestHeader("baseUrl") String baseUrl,
                                   @RequestBody Object autoControl) {
        String uri = baseUrl + "/api/lamp/control-auto";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("ApiKey", apiKey);
        HttpEntity<Object> httpEntity = new HttpEntity<>(autoControl, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response;
    }

/*    @PostMapping("/control/auto")
    public Object ObjectautoControl(@RequestHeader("apiKey") String apiKey,
                                    @RequestBody AutoControl autoControl) {
        try {
            String uri = "http://203.205.33.173:9025/api/lamp/control-auto";
            HttpRequest results = HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(autoControl));

            int status = results.code();
            if (status == 200) {
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();


        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to request";
        }
    }*/


    @PostMapping("/deviceinfor")
    public Object pelabDeviceInfor(@RequestHeader("apiKey") String apiKey,
                                   @RequestHeader("baseUrl") String baseUrl,
                                   @RequestBody Object autoControl) {
        String uri = baseUrl + "/WaterMeter/GetDeviceInfo";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("ApiKey", apiKey);
        HttpEntity<Object> httpEntity = new HttpEntity<>(autoControl, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response;
    }

    @PostMapping("/arealist")
    public Object pelabAreaList(@RequestHeader("apiKey") String apiKey,
                                @RequestHeader("baseUrl") String baseUrl,
                                @RequestBody Object autoControl) {
        String uri = baseUrl + "/WaterMeter/GetDeviceInfo";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("ApiKey", apiKey);
        HttpEntity<Object> httpEntity = new HttpEntity<>(autoControl, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response;
    }

    /*@PostMapping("/arealist")
    public Object areaList(@RequestHeader("apiKey") String apiKey) {
        try {
            String uri = "http://203.205.33.173:9025/api/GetAreaList";

            GetAreaCode cmd = new GetAreaCode(
                    "DH", "TXxu24FC80mDIWs0Vj3wyA");

            HttpRequest results = HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(cmd));

            int status = results.code();
            if (status == 200) {
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();


        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to request";
        }
    }*/

}