export const resolveCollision = (particle, otherParticle) => {
    const m1 = particle.mass;
    const m2 = otherParticle.mass;

    const angle = -Math.atan2(otherParticle.location.y - particle.location.y, otherParticle.location.x - particle.location.x);

    const v1 = 0;
    const v2 = 0;

    const prevVelocity = m1 * particle.velocity.x + m2 * otherParticle.velocity.x;
    const nextVelocity = m1 * v1 * Math.cos() + m2 * v2 * Math.cos();
};
