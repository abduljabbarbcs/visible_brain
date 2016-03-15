package com.visiblebrain.backend.adapters;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.servlet.configuration.EnableWebMvcSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.visiblebrain.backend.service.user.UserService;

@Configuration
@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
@EnableWebMvcSecurity
public class ApplicationSecurityAdapter extends WebSecurityConfigurerAdapter {
    @Autowired
    private SecurityProperties security;

    @Autowired
    private UserService userService;
    
    @Value("${app.secret}")
    private String applicationSecret;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
        .antMatchers("/user/register").access("hasRole('ROLE_ADMIN')")
        .antMatchers("/user/activate").permitAll().antMatchers("/").permitAll()
                .antMatchers(HttpMethod.GET,"/api/slide/**").permitAll()
                .antMatchers(HttpMethod.GET,"/api/overlay/**").permitAll()
                .antMatchers("/user/check-login").permitAll()
                .antMatchers("/api/overlay/**").permitAll()
//        .antMatchers("/user/activation-send").permitAll()
        .antMatchers("/user/reset-password").permitAll()
        .antMatchers("/user/reset-password-change").permitAll()
        .antMatchers("/user/autologin").access("hasRole('ROLE_ADMIN')")
        .antMatchers("/user/delete/{id}").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/user/register").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/user/getAll").access("hasRole('ROLE_ADMIN')")
                .antMatchers("/user/edit/{id}").access("hasRole('ROLE_ADMIN')")
        .antMatchers("/img/**").permitAll()
        .antMatchers("/images/**").permitAll()
        .antMatchers("/fonts/**").permitAll()
                .antMatchers("/assets/css/**").permitAll()
                .antMatchers("/assets/js/**").permitAll()
                .antMatchers("/assets/lib/**").permitAll()
                .antMatchers("/assets/img/**").permitAll()
                .antMatchers("/openseadragon/**").permitAll()
                .antMatchers("/app/**").permitAll()
//                .antMatchers("/app/app.module.js").permitAll()
//                .antMatchers("/app/app.routes.js").permitAll()
//                .antMatchers("/app/components/common/**").permitAll()
        .anyRequest().authenticated()
        .and()
            .formLogin().loginPage("/login").failureUrl("/login?error").permitAll()
        .and()
            .logout().logoutRequestMatcher(new AntPathRequestMatcher("/logout")).logoutSuccessUrl("/login")
        .and()
            .rememberMe().key(applicationSecret)
            .tokenValiditySeconds(31536000).and().csrf().disable();;
    }
    
    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(new BCryptPasswordEncoder());
    }
}
