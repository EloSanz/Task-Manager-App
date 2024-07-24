export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(dto) {
        const existingUser = await this.userRepository.findByUsername(dto.username);
        if (existingUser) {
            throw new Error("User already exists");
        }
        return this.userRepository.createUser(dto);
    }
}
