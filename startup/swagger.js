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
                Statistics: {
                    type: 'object',
                    required: [
                        'young',
                        'middleAge',
                        'oldAge',
                        'nightVision',
                        'onFoot',
                        'bus',
                        'auto',
                        'bike',
                        'otherTransport',
                        'workingDayMonth',
                        'offDayMonth',
                        'workingDay',
                        'dayOff',
                        'monthViewsSeconds',
                        'price',
                        'locationId',
                        'month',
                        "pdf"
                    ],
                    properties: {
                        young: {
                            type: 'number',
                            description: 'Statistics for young age group.'
                        },
                        middleAge: {
                            type: 'number',
                            description: 'Statistics for middle-aged group.'
                        },
                        oldAge: {
                            type: 'number',
                            description: 'Statistics for old age group.'
                        },
                        nightVision: {
                            type: 'number',
                            description: 'Statistics for night vision conditions.'
                        },
                        onFoot: {
                            type: 'number',
                            description: 'Statistics for people on foot.'
                        },
                        bus: {
                            type: 'number',
                            description: 'Statistics for people using buses.'
                        },
                        auto: {
                            type: 'number',
                            description: 'Statistics for people using cars.'
                        },
                        bike: {
                            type: 'number',
                            description: 'Statistics for people using bikes.'
                        },
                        otherTransport: {
                            type: 'number',
                            description: 'Statistics for people using other types of transport.'
                        },
                        workingDayMonth: {
                            type: 'number',
                            description: 'Working days in 1 month'
                        },
                        offDayMonth: {
                            type: 'number',
                            description: '1 day off per month'
                        },
                        workingDayStatistics: {
                            type: 'array',
                            description: 'Statistics for working days.',
                            items: {
                                type: 'object',
                                properties: {
                                    hour: {
                                        type: 'number',
                                        description: 'Hour of the day.'
                                    },
                                    viewsNumber: {
                                        type: 'number',
                                        description: 'Number of views for the specific hour.'
                                    }
                                },
                                required: ['hour', 'viewsNumber']
                            }
                        },
                        dayOffStatistics: {
                            type: 'array',
                            description: 'Statistics for days off.',
                            items: {
                                type: 'object',
                                properties: {
                                    hour: {
                                        type: 'number',
                                        description: 'Hour of the day.'
                                    },
                                    viewsNumber: {
                                        type: 'number',
                                        description: 'Number of views for the specific hour.'
                                    }
                                },
                                required: ['hour', 'viewsNumber']
                            }
                        },
                        monthViewsSeconds: {
                            type: 'number',
                            description: 'Total number of views seconds for the month.'
                        },
                        price: {
                            type: 'number',
                            description: 'The price associated with the statistics.'
                        },
                        locationId: {
                            type: 'number',
                            format: 'objectId',
                            description: 'Reference to the location associated with the statistics.'
                        },
                        month: {
                            type: 'string',
                            description: 'Add month'
                        },
                        pdf: {
                            type: 'string',
                            description: 'Add pdf'
                        },
                    }
                },
                Location: {
                    type: 'object',
                    required: ['address', 'image', 'locationImage','video','screenPixel','fromHour','toHour','passportID','region','screenSize'],
                    properties: {
                        address: {type: 'string', description: 'Name of the user'},
                        image: {type: 'string', description: 'Login of the user'},
                        locationImage: {type: 'string', description: 'Password for the user account'},
                        video: {type: 'string', description: 'Password for the user account'},
                        screenPixel: {type: 'string', description: 'Password for the user account'},
                        screenSize: {type: 'string', description: 'Password for the user account'},
                        fromHour: {type: 'string', description: 'Password for the user account'},
                        toHour: {type: 'string', description: 'Password for the user account'},
                        passportID: {type: 'string', description: 'Password for the user account'},
                        region: {type: 'string', description: 'Password for the user account'},
                    },
                },
                User: {
                    type: 'object',
                    required: ['name', 'login', 'password'],
                    properties: {
                        name: {type: 'string', description: 'Name of the user'},
                        login: {type: 'string', description: 'Login of the user'},
                        password: {type: 'string', description: 'Password for the user account'},
                        role: {type: 'string', description: 'Password for the user account'},
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
    app.use('/api/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
