package helpers

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"

	"github.com/emreaknci/peakeyecase/server/utils/response"
	"github.com/google/uuid"
)

const uploadDir = "uploads"

func UploadFile(file multipart.File, fileHeader *multipart.FileHeader) response.CustomResponse {

	defer file.Close()

	if err := os.MkdirAll(uploadDir, os.ModePerm); err != nil {
		return response.CustomResponse{Message: "Directory could not be created", Error: "Internal Server Error", StatusCode: http.StatusInternalServerError, Status: false}
	}

	fileName := fmt.Sprintf("%s%s", uuid.New().String(), filepath.Ext(fileHeader.Filename))
	filePath := filepath.Join(uploadDir, fileName)

	destFile, err := os.Create(filePath)
	if err != nil {
		return response.CustomResponse{Message: "File could not be created", Error: "Internal Server Error", StatusCode: http.StatusInternalServerError, Status: false}
	}
	defer destFile.Close()

	if _, err := io.Copy(destFile, file); err != nil {
		return response.CustomResponse{Message: "File could not be written", Error: "Internal Server Error", StatusCode: http.StatusInternalServerError, Status: false}
	}

	return response.CustomResponse{Message: "File uploaded successfully", Data: fileName, StatusCode: http.StatusOK, Status: true}
}

func DeleteFile(fileName string) response.CustomResponse {
	filePath := filepath.Join(uploadDir, fileName)

	if err := os.Remove(filePath); err != nil {
		if os.IsNotExist(err) {
			return response.CustomResponse{Message: fmt.Sprintf("File could not be found with name: %s", fileName), Error: "Not Found", StatusCode: http.StatusNotFound}
		} else {
			return response.CustomResponse{Message: "File could not be deleted", Error: "Internal Server Error", StatusCode: http.StatusInternalServerError}
		}

	}

	return response.CustomResponse{Message: "File deleted successfully", StatusCode: http.StatusOK, Status: true}

}
