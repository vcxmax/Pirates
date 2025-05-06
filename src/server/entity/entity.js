import Transform from './component/transform'; 

class Entity {
    constructor(id, position, rotation = 0) {
        this.id = id; 
        this.transform = new Transform(this, position, rotation);
        this.components = new Map();
    }

    update(delta) {
        const componentsCopy = Array.from(this.components.values());
        for (const component of componentsCopy) {
            if (component.active) {
                component.onUpdate(delta);
            }
        }
    }

    // eslint-disable-next-line no-unused-vars
    onCollision(entity) {
        
    }

    addComponent(component) {
        this.components.set(component.constructor.name, component);
    }

    removeComponent(componentClass) {
        this.components.delete(componentClass.name);
    }

    getComponent(componentClass) {
        return this.components.get(componentClass.name);
    }
    
    hasComponent(componentClass) {
        return this.components.has(componentClass.name);
    }

    setComponentActive(componentClass, active) {
        const component = this.getComponent(componentClass);
        if (component) {
            component.active = active;
            active ? component.onActivate() : component.onDeactivate();
        }
    }
}

export default Entity;