angular
    .module('game.systems.model', [
        'ces',
        'three',
        'engine.geometry-cache',
        'engine.material-cache'
    ])
    .factory('ModelSystem', [
        'System',
        'THREE',
        '$geometryCache',
        '$materialCache',
        'TextureLoader',
        function(System, THREE, $geometryCache, $materialCache, TextureLoader) {
            'use strict';

            function getGeometry(type) {
                var geometry;

                if (type === 'Box') {
                    geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                }

                if (type === 'Sphere') {
                    geometry = new THREE.SphereGeometry(1);
                }

                if (type === 'Circle') {
                    geometry = new THREE.CircleGeometry(1);
                }

                if (type === 'Cylinder') {
                    geometry = new THREE.CylinderGeometry();
                }

                if (type === 'Icosahedron') {

                }

                if (type === 'Torus') {

                }

                if (type === 'TorusKnot') {

                }

                return geometry;
            }

            var ModelSystem = System.extend({
                addedToWorld: function(world) {
                    var sys = this;

                    sys._super(world);

                    world.entityAdded('model').add(function(entity) {
                        sys.onEntityAdded(entity);
                    });
                },
                update: function() {},
                onEntityAdded: function(entity) {
                    var component = entity.getComponent('model'),
                        geometry;

                    if (component.type === 'mesh') {
                        // special handling, for now assume this is a json load
                        var loader = new THREE.ObjectLoader();
                        var fobj = {
                            geometries: [$geometryCache.get(component.geometry.uuid)],
                            materials: [$materialCache.get(component.material.uuid)],
                            object: {
                                type: 'Mesh',
                                geometry: component.geometry.uuid,
                                material: component.material.uuid
                            }
                        };

                        component.model = loader.parse(fobj);
                    } else {
                        geometry = getGeometry(component.type);
                        component.model = new THREE.Mesh(geometry);
                    }
                    entity.add(component.model);
                },
                onEntityRemoved: function(entity) {
                    // TODO
                }
            });

            return ModelSystem;
        }
    ]);
