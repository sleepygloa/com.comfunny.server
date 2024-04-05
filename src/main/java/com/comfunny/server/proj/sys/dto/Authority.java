package com.comfunny.server.proj.sys.dto;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "authority")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority {

    @Id
    private Long id;

    @Column(name = "authority_name", length = 50, unique = false)
    private String authorityName;
}