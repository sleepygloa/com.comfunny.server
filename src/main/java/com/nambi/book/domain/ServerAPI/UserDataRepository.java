package com.nambi.book.domain.ServerAPI;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDataRepository extends JpaRepository<UserData, Integer> {


    UserData findByIdOrEmail(String id, String email);

    void save(String id, String pw, String email, String path, String type);

}
