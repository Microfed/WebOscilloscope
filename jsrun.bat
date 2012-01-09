@echo off
set DOCDIR=%CD%\utility\jsdoc-toolkit
set APPDIR=%CD%\utility\jsdoc-toolkit\app
set BASEDIR=%CD%\utility\jsdoc-toolkit
set TDIR=%CD%\utility\jsdoc-toolkit\templates\jsdoc
set DOCSDIR=%CD%\docs

set CMD=java -Djsdoc.dir=%DOCDIR% -Djsdoc.template.dir=%TDIR% -jar %BASEDIR%\jsrun.jar %APPDIR%\run.js -d=%DOCSDIR% %*
echo Writing a documentation...
echo Output dir: %DOCSDIR%
%CMD%