package com.comfunny.server.api.excel;


import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
public class ExcelController {

    @PostMapping("/api/excelUpload")
    public List<Map<String, String>> uploadExcelFile(@RequestParam("file") MultipartFile file) {
        List<Map<String, String>> list = new ArrayList<>();

        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();

            List<String> headers = new ArrayList<>();
            if (rows.hasNext()) {
                Row headerRow = rows.next();
                headerRow.forEach(cell -> headers.add(cell.getStringCellValue()));
            }

            while (rows.hasNext()) {
                Row row = rows.next();
                Map<String, String> rowData = new HashMap<>();
                for (int i = 0; i < headers.size(); i++) {
                    Cell cell = row.getCell(i, Row.MissingCellPolicy.RETURN_BLANK_AS_NULL);
                    String cellValue = cell == null ? "" : cell.toString();
                    rowData.put(headers.get(i), cellValue);
                }
                list.add(rowData);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return list;
    }
}