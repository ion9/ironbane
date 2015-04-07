angular
    .module('engine.game-service', [
        'game.game-loop',
        'game.world-root',
        'game.network',
        'components',
        'game.scripts',
        'game.prefabs',
        'engine.entity-builder',
        'engine.sound-system',
        'engine.input.input-system',
        'util.name-gen',
        'components.scene.name-mesh'
    ])
    .service('GameService', [
        '$rootWorld',
        'CameraSystem',
        'ModelSystem',
        'LightSystem',
        'SpriteSystem',
        'QuadSystem',
        'HelperSystem',
        'SceneSystem',
        'ScriptSystem',
        'SoundSystem',
        'InputSystem',
        'RigidBodySystem',
        'CollisionReporterSystem',
        'WieldItemSystem',
        'EntityBuilder',
        '$log',
        'ProcTreeSystem',
        'ShadowSystem',
        'FantasyNameGenerator',
        'NameMeshSystem',
        'AchievementSystem',
        'Network',
        function($rootWorld, CameraSystem, ModelSystem,
            LightSystem, SpriteSystem, QuadSystem, HelperSystem, SceneSystem, ScriptSystem,
            SoundSystem, InputSystem, RigidBodySystem, CollisionReporterSystem, WieldItemSystem,
            EntityBuilder, $log, ProcTreeSystem, ShadowSystem,
            FantasyNameGenerator, NameMeshSystem, AchievementSystem, Network) {
            'use strict';

            this.start = function() {
                // ALL these systems have to load before other entities
                // they don't load stuff after the fact...
                // TODO: fix that
                $rootWorld.addSystem(new SceneSystem());
                $rootWorld.addSystem(new NameMeshSystem());
                $rootWorld.addSystem(new InputSystem(), 'input');
                $rootWorld.addSystem(new SoundSystem(), 'sound');
                $rootWorld.addSystem(new ScriptSystem(), 'scripts');
                $rootWorld.addSystem(new ProcTreeSystem(), 'proctree');
                $rootWorld.addSystem(new SpriteSystem());
                $rootWorld.addSystem(new ModelSystem());
                $rootWorld.addSystem(new LightSystem());
                $rootWorld.addSystem(new QuadSystem());
                $rootWorld.addSystem(new RigidBodySystem(), 'rigidbody');
                $rootWorld.addSystem(new CollisionReporterSystem());
                $rootWorld.addSystem(new HelperSystem());
                $rootWorld.addSystem(new WieldItemSystem());
                $rootWorld.addSystem(new ShadowSystem());
                $rootWorld.addSystem(new AchievementSystem());

                // NOTE: this should be the LAST system as it does rendering!!
                $rootWorld.addSystem(new CameraSystem(), 'camera');

                // Initialize Meteor's entities collection
                Network.init();
            };
        }
    ]);