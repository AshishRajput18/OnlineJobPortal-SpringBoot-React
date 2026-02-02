package com.backend.service;

import com.backend.entity.Category;
import com.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

	@Autowired
    private  CategoryRepository categoryRepository;

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }
    // UPDATE
    public Category updateCategory(Long id, Category request) {
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category Not Found"));

        category.setTitle(request.getTitle());
        category.setDescription(request.getDescription());

        return categoryRepository.save(category);
    }

    // DELETE
    public String deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new RuntimeException("Category Not Found");
        }

        categoryRepository.deleteById(id);
        return "Category Deleted Successfully";
    }
    public Category getById(Long id) {
        return categoryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Category Not Found"));
    }

}
