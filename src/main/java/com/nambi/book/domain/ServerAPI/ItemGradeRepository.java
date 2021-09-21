package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemGradeRepository extends JpaRepository<ItemGrade, Integer> {

    List<ItemGrade> findAll();
}
