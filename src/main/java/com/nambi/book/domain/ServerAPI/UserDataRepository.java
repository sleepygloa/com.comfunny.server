package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDataRepository extends JpaRepository<UserData, Integer> {

    UserData findById(String id);

    @Query(value="SELECT * FROM user_data WHERE id = ?1 OR email = ?2", nativeQuery = true)
    UserData findByIdOrEmail(String id, String email);

    @Query(value = "INSERT INTO user_data (id, pw, email, name, path, type) VALUES (?1, ?2, ?3, ?4, ?5, ?6)", nativeQuery = true)
    void insert(String id, String pw, String email, String name, String path, String type);

}
