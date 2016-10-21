define('base/parent-view',
    [
        'jquery', 
        'backbone', 
        'base/base-view'
    ],
    function($, Backbone, BaseView){
    'use strict';
    
    var ParentView = BaseView.extend({
        
        initialize: function(){
            //Should be kept as 'selector' : view
            this.children = {};
            ParentView.__super__.initialize.apply(this, arguments);
        },
    
        ShowChild: function(view, selector){
            //If there is already a view there we want to remove that first
            var _this = this,
                oldView = _this.children[selector];
                
            if (oldView){
                oldView.Close();
            }
            
            _this.children[selector] = view;
            _this.$(selector, true).appendChild(view.render().el);
            
            return _this;
        },
    
        Close: function() {
            //Close all child views
            var _this = this;
            Object.keys(this.children).forEach(function(selector){
                _this.children[selector].Close();
            });
            this.children = {};
        
            return ParentView.__super__.Close.call(this, arguments);
        }
    
    });
    return ParentView;
});
