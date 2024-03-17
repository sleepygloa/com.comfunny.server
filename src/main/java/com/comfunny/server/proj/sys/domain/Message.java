package com.comfunny.server.proj.sys.domain;

import com.comfunny.server.sys.BaseTimeEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Setter
@Getter
@NoArgsConstructor
@Table(name = "tb_sy_message")
public class Message extends BaseTimeEntity {

    @EmbeddedId
    private MessagePk messagePk;

    @Column(length = 500)
    private String msgTxt;
    @Column(length = 1)
    @NotBlank
    @ColumnDefault("'Y'")
    private String useYn;


    @Builder
    public Message(MessagePk messagePk, String msgTxt, String useYn) {
        this.messagePk = messagePk;
        this.msgTxt = msgTxt;
        this.useYn = useYn;
    }
}
