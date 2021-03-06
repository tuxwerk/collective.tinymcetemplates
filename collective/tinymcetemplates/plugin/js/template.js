var TemplateDialog = {
  preInit : function() {
        
  },

  init : function() {
    var ed = tinyMCEPopup.editor, tsrc, sel, x, u;
    
    // Load templates from an explicit parameter. By default, we don't
    // use this
    tsrc = ed.getParam("template_templates", false);
    sel = document.getElementById('tpath');

    // Use external template list as a fallback
    if (!tsrc && typeof(tinyMCETemplateList) != 'undefined') {
      for (x=0, tsrc = []; x < tinyMCETemplateList.length; x++)
        tsrc.push({ title :       tinyMCETemplateList[x][0],
		    url :         tinyMCETemplateList[x][1],
		    description : tinyMCETemplateList[x][2],
		    raw :         tinyMCETemplateList[x][3],
		    content :     tinyMCETemplateList[x][4] });
    }

    for (x=0; x<tsrc.length; x++)
      sel.options[sel.options.length] = new Option(tsrc[x].title, tsrc[x].url);

    this.resize();
    this.tsrc = tsrc;
  },

  resize : function() {
    var w, h, e;

    if (!self.innerWidth) {
      w = document.body.clientWidth - 50;
      h = document.body.clientHeight - 160;
    } else {
      w = self.innerWidth - 50;
      h = self.innerHeight - 170;
    }
    
    e = document.getElementById('templatesrc');

    if (e) {
      e.style.height = Math.abs(h - 80) + 'px';
      e.style.width  = Math.abs(w - 100) + 'px';
    }
  },

  loadCSSFiles : function(d) {
    var ed = tinyMCEPopup.editor;

    tinymce.each(ed.getParam("content_css", '').split(','), function(u) {
      d.write('<link href="' + ed.documentBaseURI.toAbsolute(u) + '" rel="stylesheet" type="text/css" />');
    });
  },

  selectTemplate : function(u, ti) {
    var d = document.getElementById('templatesrc'), x, tsrc = this.tsrc;

    if (!u)
      return;

    for (x=0; x<tsrc.length; x++) {
      if (tsrc[x].url == u) {
        document.getElementById('tmpldesc').innerHTML = tsrc[x].description || '';
	this.templateHTML = tsrc[x].raw || '';
	d.innerHTML = tsrc[x].content || '';
      }
    }
  },

  insert : function() {
    tinyMCEPopup.execCommand('mcePloneInsertTemplate', false, {
      content : this.templateHTML,
      selection : tinyMCEPopup.editor.selection.getContent()
    });

    tinyMCEPopup.close();
  }
};

tinyMCEPopup.requireLangPack();
TemplateDialog.preInit();
tinyMCEPopup.onInit.add(TemplateDialog.init, TemplateDialog);
