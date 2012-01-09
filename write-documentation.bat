@echo off
set js-path=.\js\
set script-path=%js-path%VisualizeManager.js %js-path%DataStream.js %js-path%DataTransform.js %js-path%Visualizer.js
set option=-a -p

jsrun %script-path% %option%