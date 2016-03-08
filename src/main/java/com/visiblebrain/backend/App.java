package com.visiblebrain.backend;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Date;
import java.util.Map;

/**
 * Created by rehan.sarwar on 11/3/2015.
 */
@SpringBootApplication
@EnableSwagger2
 @Controller
public class App extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(App.class);
    }
    public static Logger log = Logger.getLogger(App.class.getName());
    public static void main(String [] args){
        SpringApplication.run(App.class, args);
    }

    
    public Docket visibleBrainApi(){
    	return new Docket(DocumentationType.SWAGGER_2)
    		.groupName("visible-brain-api")
    		.apiInfo(apiInfo())
    		.pathMapping("/api");
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("Visible Brain backend API")
                .description("Visible Brain backend API description")
                .contact("services@octryx.com")
                .version("0.0.1-SNAPSHOT")
                .build();
    }
    @RequestMapping("/")
    public String home(Map<String, Object> model) {
        model.put("message", "Hello World");
        model.put("title", "Hello Home");
        model.put("date", new Date());
        return "index";
    }
}
