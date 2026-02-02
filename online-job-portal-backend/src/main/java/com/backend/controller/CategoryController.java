package com.backend.controller;

import com.backend.entity.Category;
import com.backend.service.CategoryService;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {

	@Autowired
    private  CategoryService categoryService;

    @PostMapping("/add")
    public Category addCategory(@RequestBody Category category) {
        return categoryService.save(category);
    }

    @GetMapping("/all")
    public List<Category> getAllCategories() {
        return categoryService.getAll();
    }
    // UPDATE
    @PutMapping("/update/{id}")
    public Category update(@PathVariable Long id, @RequestBody Category category) {
        return categoryService.updateCategory(id, category);
    }

    // DELETE
    @DeleteMapping("/delete/{id}")
    public String delete(@PathVariable Long id) {
        return categoryService.deleteCategory(id);
    }
    @GetMapping("/{id}")
    public Category getOne(@PathVariable Long id) {
        return categoryService.getById(id);
    }

}
