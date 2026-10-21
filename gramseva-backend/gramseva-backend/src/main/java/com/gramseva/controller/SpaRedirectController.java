package com.gramseva.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaRedirectController {

    // Serve the React app for the root URL
    @GetMapping("/")
    public String serveRoot() {
        return "forward:/index.html";
    }

    // Serve the React app for all frontend routes
    @RequestMapping(value = {
            "/login",
            "/register",
            "/forgot-password",
            "/unauthorized",
            "/department-head-setup",
            "/ai-assistant"
    })
    public String serveFrontendPages() {
        return "forward:/index.html";
    }

    // Citizen routes
    @RequestMapping("/citizen/{path:.*}")
    public String serveCitizenRoutes() {
        return "forward:/index.html";
    }

    @RequestMapping("/citizen/{path1}/{path2:.*}")
    public String serveCitizenNestedRoutes() {
        return "forward:/index.html";
    }

    // Officer routes
    @RequestMapping("/officer/{path:.*}")
    public String serveOfficerRoutes() {
        return "forward:/index.html";
    }

    @RequestMapping("/officer/{path1}/{path2:.*}")
    public String serveOfficerNestedRoutes() {
        return "forward:/index.html";
    }

    // Admin routes
    @RequestMapping("/admin/{path:.*}")
    public String serveAdminRoutes() {
        return "forward:/index.html";
    }
}
