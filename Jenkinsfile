pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'vite-react-admin'
        DOCKER_REGISTRY = 'localhost:5000'
        DOCKER_IMAGE_TAG = 'latest'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/coderzzx25/vite-react-admin.git', branch: 'master'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            when {
                branch 'master'  // 更新为 master 分支或其他适用分支
            }
            steps {
                script {
                    docker.withRegistry("http://${DOCKER_REGISTRY}") {
                        docker.image("${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}").push(DOCKER_IMAGE_TAG)
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // 停止并删除旧的容器
                    sh "docker stop ${DOCKER_IMAGE_NAME} || true"
                    sh "docker rm ${DOCKER_IMAGE_NAME} || true"

                    // 运行新的容器
                    sh "docker run -d --name ${DOCKER_IMAGE_NAME} -p 8080:8080 ${DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${DOCKER_IMAGE_TAG}"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
