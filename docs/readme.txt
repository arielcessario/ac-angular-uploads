TODO: Hacer un utils para todos con las funciones mas usadas:


Dependencies:
ac-angular-utils


Comentarios:


Notas:


Uso:
En el html se debe crear un uploader
ac-upload-files="administracionCtrl.updateFotoProyecto(selectedFileList,1,'')"


en el controller
function updateFotoProyecto(filelist, id, sub_folder) {
            UploadService.addImages(filelist, id, sub_folder, function (data) {
                for (var i = 0; i < UploadVars.uploadsList.length; i++) {
                    if (UploadVars.uploadsList[i].id == 1) {
                        vm.foto_01 = UploadVars.uploadsList[i].file.name;
                    }
                    if (UploadVars.uploadsList[i].id == 2) {
                        vm.foto_02 = UploadVars.uploadsList[i].file.name;
                    }
                    if (UploadVars.uploadsList[i].id == 3) {
                        vm.foto_03 = UploadVars.uploadsList[i].file.name;
                    }
                    if (UploadVars.uploadsList[i].id == 4) {
                        vm.foto_04 = UploadVars.uploadsList[i].file.name;
                    }

                }
                $scope.$apply();
                //console.log(data);
            })
        }