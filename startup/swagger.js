import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'This is the API documentation for the project',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {

                Location: {
                    type: 'object',
                    required: ['address', 'image', 'locationImage','video','screenPixel','fromHour','toHour','passportID'],
                    properties: {
                        address: {type: 'string', description: 'Name of the user'},
                        image: {type: 'string', description: 'Login of the user'},
                        locationImage: {type: 'string', description: 'Password for the user account'},
                        video: {type: 'string', description: 'Password for the user account'},
                        screenPixel: {type: 'string', description: 'Password for the user account'},
                        fromHour: {type: 'string', description: 'Password for the user account'},
                        toHour: {type: 'string', description: 'Password for the user account'},
                        passportID: {type: 'string', description: 'Password for the user account'},
                    },
                },

                User: {
                    type: 'object',
                    required: ['name', 'login', 'password'],
                    properties: {
                        name: {type: 'string', description: 'Name of the user'},
                        login: {type: 'string', description: 'Login of the user'},
                        password: {type: 'string', description: 'Password for the user account'},
                    },
                },

                Auth: {
                    type: 'object',
                    required: ['login', 'password'],
                    properties: {
                        login: {type: 'string', description: 'Email address for authentication'},
                        password: {type: 'string', description: 'Password for authentication'},
                    },
                },

                Media: {
                    type: 'object',
                    required: ['path', 'name'],
                    properties: {
                        path: {type: 'string', description: 'Path to image'},
                        name: {type: 'string', description: 'Name of the image'},
                    },
                },

            },
        },
        security: [
            {
                bearerAuth: [], // Apply bearerAuth globally
            },
        ],
        basePath: '/api',
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default function setupSwagger(app) {
    const options = {
        swaggerOptions: {
            url: '/api/swagger.json', // Serve the spec as JSON
        },
    };
    app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec,options));
}