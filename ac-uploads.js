(function () {

    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;


    if (currentScriptPath.length == 0) {
        currentScriptPath = window.installPath + '/ac-angular-uploads/includes/ac-uploads.php';
    } else {
        currentScriptPath = currentScriptPath.replace('ac-uploads.js', 'includes/ac-uploads.php');
    }

    angular.module('acUploads', [])
        .directive('acUploadFiles', AcUploadFiles)
        .factory('UploadService', UploadService)
        .service('UploadVars', UploadVars)
    ;

    UploadService.$inject = ["UploadVars", "$http"];
    function UploadService(UploadVars, $http) {
        var services = {};
        services.uploadImages = uploadImages;
        services.addImages = addImages;

        return services;

        /**
         * @description agrega las imagenes a una lista temporal y los sube
         * @param filelist
         * @param id identificador de la imagen para poder ubicar a que perteneces, proyecto, cliente, donación, etc.
         * TODO: Que no se pierda la lista cuando se refresca la pantalla
         */
        function addImages(filelist, id, sub_folder, compress, callback) {
            for (var i = 0; i < filelist.length; ++i) {
                var file = filelist.item(i);
                uploadImages(file, sub_folder, compress, callback);
                var encontrado = -1;
                for (var x = 0; x < UploadVars.uploadsList.length; x++) {
                    if (UploadVars.uploadsList[x].id == id) {
                        encontrado = x;
                    }
                }

                if (encontrado > -1) {
                    UploadVars.uploadsList[encontrado].file = file;
                } else {
                    UploadVars.uploadsList.push({id: id, file: file});
                }
            }
        }

        /**
         * @description Sube las imágenes al repositorio
         * @param file
         * @param tipo
         */
        function uploadImages(file, sub_folder, compress, callback) {
            $http.post(currentScriptPath, {'function': 'setCompression', 'value': compress})
                .success(function (data) {
                    var form_data = new FormData();
                    /* Limito la subida de archivos a 400kb*/
                    if (file.size > 800000) {
                        alert('No se puede subir un archivo que sea mayor a 400k');
                        return;
                    }
                    form_data.append('compress', compress);
                    form_data.append('images', file);
                    form_data.append('folder', sub_folder);
                    var ajax = new XMLHttpRequest();
                    ajax.onprogress = function () {
                    };
                    ajax.onload = function (data) {
                        callback(data);
                    };
                    ajax.onerror = function (data) {
                        callback(data);
                    };
                    ajax.open("POST", currentScriptPath, true);
                    ajax.send(form_data);
                })
                .error(function (data) {
                    console.log(data);
                })

        }
    }


    function AcUploadFiles() {
        return {
            restrict: 'A',
            scope: {
                acUploadFiles: '&'
            },
            link: function (scope, element, attr, Controller) {
                element.bind("change", function () {
                    scope.acUploadFiles({selectedFileList: element[0].files});
                });
            }
        }
    }


    function UploadVars() {
        this.uploadsList = [];
    }
})();
