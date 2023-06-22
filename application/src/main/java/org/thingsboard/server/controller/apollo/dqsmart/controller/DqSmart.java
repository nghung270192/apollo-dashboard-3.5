package org.thingsboard.server.controller.apollo.dqsmart.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;


@RestController
@RequestMapping("api/dqsmart")
public class DqSmart {
    @GetMapping("/states")
    public Object getStates(@RequestHeader("token") String token,
                            @RequestHeader("baseUrl") String baseUrl) {
        String uri = baseUrl + "/api/states";
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Bearer " + token);
        HttpEntity<String> httpEntity = new HttpEntity<>(null, headers);
        return restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class).getBody();
    }

    @GetMapping("/states/{entityId}")
    public Object getState(@RequestHeader("token") String token,
                           @RequestHeader("baseUrl") String baseUrl,
                           @PathVariable("entityId") String entityId) {
        String uri = baseUrl + "/api/states/" + entityId;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Bearer " + token);
        HttpEntity<String> httpEntity = new HttpEntity<>(null, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);
        return response.getBody();
    }


    @PostMapping("/services/{domain}/{service}")
    public Object callServices(@RequestHeader("token") String token,
                               @RequestHeader("baseUrl") String baseUrl,
                               @PathVariable("domain") String domain,
                               @PathVariable("service") String service,
                               @RequestBody Object serviceData) {
        String uri = baseUrl + "/api/services/" + domain + "/" + service;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Bearer " + token);
        HttpEntity<Object> httpEntity = new HttpEntity<>(serviceData, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response.getBody();
    }

    @PostMapping("/")
    public Object basePostRequestApi(@RequestHeader("token") String token,
                                     @RequestHeader("baseUrl") String baseUrl,
                                     @RequestHeader("api") String api,
                                     @RequestBody Object bodyData) {
        String uri = baseUrl + api;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Bearer " + token);
        HttpEntity<Object> httpEntity = new HttpEntity<>(bodyData, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.POST, httpEntity, Object.class);
        return response.getBody();
    }

    @GetMapping("/")
    public Object baseGetRequestApi(@RequestHeader("token") String token,
                                    @RequestHeader("baseUrl") String baseUrl,
                                    @RequestHeader("api") String api) {
        String uri = baseUrl + api;
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.add("Authorization", "Bearer " + token);
        HttpEntity<Object> httpEntity = new HttpEntity<>(null, headers);
        ResponseEntity<Object> response = restTemplate.exchange(uri, HttpMethod.GET, httpEntity, Object.class);

        return response.getBody();
    }

    /*@PostMapping("/control/manual")
    public Object manualControl(@RequestHeader("apiKey") String apiKey,
                                @RequestBody ManualControl manualControl) {
        try {
            String uri="http://203.205.33.173:9025/api/lamp/control-manual";

            HttpRequest results =   HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(manualControl)) ;

            int status= results.code();
            if(status==200){
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();
        }catch (Exception e){
            e.printStackTrace();
            return new Object();
        }
    }

    @PostMapping("/control/auto")
    public Object ObjectautoControl(@RequestHeader("apiKey") String apiKey,
                                    @RequestBody AutoControl autoControl) {
        try {
            String uri="http://203.205.33.173:9025/api/lamp/control-auto";
            HttpRequest results =   HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(autoControl)) ;

            int status= results.code();
            if(status==200){
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();


        }catch (Exception e){
            e.printStackTrace();
            return  "Failed to request";
        }
    }

    @RequestMapping(value = "/deviceinfor", method =
            RequestMethod.POST, consumes = "application/json", produces = "application/json")
    public Object deviceInfor(@RequestHeader("apiKey") String apiKey,
                                                              @RequestBody GetDeviceInfor deviceInfor) {
        try {
            String uri="http://203.205.33.173:9025/WaterMeter/GetDeviceInfo";
            *//* GetDeviceInfor cmd = new GetDeviceInfor(deviceInfor);*//*
            System.out.println(deviceInfor);

            HttpRequest results =   HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(deviceInfor)) ;


            int status= results.code();
            if(status==200){
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();

        }catch (Exception e){
            e.printStackTrace();
            return  "Failed to request";
        }
    }

    @PostMapping("/arealist")
    public Object areaList(@RequestHeader("apiKey") String apiKey) {
        try {
            String uri="http://203.205.33.173:9025/api/GetAreaList";

            GetAreaCode cmd = new GetAreaCode(
                    "DH","TXxu24FC80mDIWs0Vj3wyA");

            HttpRequest results =   HttpRequest.post(uri)
                    .header("Content-Type", "application/json")
                    .header("ApiKey", apiKey)
                    .send(ConvertToJson.setJsonString(cmd)) ;

            int status= results.code();
            if(status==200){
                ObjectMapper objectMapper = new ObjectMapper();
                Object res = objectMapper.readValue(results.body(), Object.class);
                return res;
            }

            return results.body();


        }catch (Exception e){
            e.printStackTrace();
            return  "Failed to request";
        }
    }*/

}