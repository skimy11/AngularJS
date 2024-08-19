package kr.burin.sample.util;

import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.builders.ResponseMessageBuilder;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.service.ResponseMessage;
import springfox.documentation.service.VendorExtension;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@EnableSwagger2
@EnableWebMvc
public class SwaggerConfig implements WebMvcConfigurer{
	
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
	    registry.addResourceHandler("swagger-ui.html")
	      .addResourceLocations("classpath:/META-INF/resources/");

	    registry.addResourceHandler("/webjars/**")
	      .addResourceLocations("classpath:/META-INF/resources/webjars/");
	}	
	
	@Bean
	public Docket API_MANAGE() {
        return new Docket(DocumentationType.SWAGGER_2)
        		.groupName("1. MANAGE")
                .useDefaultResponseMessages(false)
            	.globalResponseMessage(RequestMethod.POST, getArrayList())
            	.apiInfo(getApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("kr.burin.sample.manage"))
                .paths(PathSelectors.any())
                .build();
    }
	
	@Bean
	public Docket API_USER() {
        return new Docket(DocumentationType.SWAGGER_2)
        		.groupName("2. USER")
                .useDefaultResponseMessages(false)
            	.globalResponseMessage(RequestMethod.POST, getArrayList())
            	.apiInfo(getApiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("kr.burin.sample.user"))
                .paths(PathSelectors.any())
                .build();
    }
	
	// 선택항목(Swagger UI에서 보여지는 정보)
	public ApiInfo getApiInfo() {
		return new ApiInfo("부린 샘플 스웨거 화면",        // swagger 제목
				"스웨거 API 문서",                     // swagger 설명
				"1.0",                                           // swaggeer 버전
				"localhost:8080",
				new Contact("","",""), //작성자 정보
				"", "",
				new ArrayList<VendorExtension>());
	}

	// 선택항목(responseMessage 리스트를 별도로 생성.(defaultResponseMessage 미사용))
	private ArrayList<ResponseMessage> getArrayList() {  
		ArrayList<ResponseMessage> lists = new ArrayList<ResponseMessage>();
		lists.add(new ResponseMessageBuilder().code(500).message("이상한요청").build());
		lists.add(new ResponseMessageBuilder().code(403).message("황당한요청").build());
		lists.add(new ResponseMessageBuilder().code(401).message("비인증된접근").build());
		return lists;
	}
}