if (Meteor.isClient) {
    var Engine = famous.core.Engine;// require('famous/core/Engine');
    var Surface = famous.core.Surface;//require('famous/core/Surface');
    var Modifier = famous.core.Modifier; //require('famous/core/Modifier');
    var HeaderFooterLayout = famous.views.HeaderFooterLayout;//require("famous/views/HeaderFooterLayout");
    var GridLayout = famous.views.GridLayout; //require("famous/views/GridLayout");
    var View = famous.core.View;
    var Transform = famous.core.Transform; //require('famous/core/Transform');
    var StateModifier = famous.core.Transform; // require('famous/modifiers/StateModifier');


    var mainContext = Engine.createContext();

    var layout = new HeaderFooterLayout({
        headerSize: 100,
        footerSize: 50
    });

    layout.header.add(new Surface({
        size: [undefined, 100],
        content: "Header",
        properties: {
            backgroundColor: 'gray',
            lineHeight: "100px",
            textAlign: "center"
        }
    }));

    layout.content.add(new Surface({
        content: "Manu Beng Beng !",
        properties: {
            backgroundColor: '#fa5c4f',
            lineHeight: '400px',
            textAlign: "center"
        }
    }));

    layout.footer.add(new Surface({
        size: [undefined, 50],
        content: "Footer",
        properties: {
            backgroundColor: 'gray',
            lineHeight: "50px",
            textAlign: "center"
        }
    }));

    mainContext.add(layout);




    createLayout();
   // addContent();

    function createLayout() {
        layout = new HeaderFooterLayout({
            headerSize: 100,
            footerSize: 50
        });

        mainContext.add(layout);
    }

    function addHeader() {
        layout.header.add(new Surface({
            content: "Header",
            properties: {
                backgroundColor: 'gray',
                lineHeight: "100px",
                textAlign: "center"
            }
        }));
    }

    function addFooter() {
        layout.footer.add(new Surface({
            content: "Footer",
            properties: {
                backgroundColor: 'gray',
                lineHeight: "50px",
                textAlign: "center"
            }
        }));
    }

    function addContent() {
        var grid = new GridLayout({
            dimensions: [2, 1]
        });

        var views = [];
        grid.sequenceFrom(views);

        for(var i = 0; i < 2; i++) {
            var view = new View();

            var centerModifier = new Modifier({
                origin: [0.5, 0.5],
                align: [0.5, 0.5]
            });

            var surface = new Surface({
                id: 'surface' + i,
                content: 'content' + (i + 1),
                size: [100, 100],
                properties: {
                    backgroundColor: '#fa5c4f',
                    color: 'white',
                    textAlign: 'center',
                    lineHeight: '100px'
                }
            });

            surface.on('click', function() {
                //View.ById(this.id).setColor('red');
                console.log(this.id);
                surface.setProperties({
                    backgroundColor: '#878785'
                });
            });

            view.add(centerModifier).add(surface);

            views.push(view);
        }

        layout.content.add(grid);
    }
}